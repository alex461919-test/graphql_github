import { HttpLink, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { message } from "antd";
import { MessageType } from "antd/lib/message";
import debounce from "lodash.debounce";

const personalToken = makeVar<string>("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");
const activeProcesses = makeVar<string[]>([]);

//   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1

(async () => {
  let hide: MessageType | null = null;

  const onChange = debounce((value) => {
    if (value.length > 0 && !hide)
      hide = message.open({
        content: "Fetch in progress..",
        type: "loading",
        duration: 0,
        style: { width: "fit-content", margin: "0 8px 0 auto" },
      });
    if (value.length === 0 && hide) {
      hide();
      hide = null;
    }
  }, 50);

  while (true) onChange(await new Promise<string[]>((resolve) => activeProcesses.onNextChange((value) => resolve(value))));
})();

const setAuthorizationLink = setContext((request, previousContext) => {
  const token = personalToken();
  return token
    ? {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    : {};
});

function not<T>(pattern: T) {
  return (value: T): boolean => pattern !== value;
}

const customFetch: typeof fetch = async (...args) => {
  const reqid = (Math.random() + 1).toString(36).substring(2);
  activeProcesses([...activeProcesses(), reqid]);
  try {
    return await fetch(...args);
  } finally {
    activeProcesses(activeProcesses().filter(not(reqid)));
  }
};

const httpLink = new HttpLink({ fetch: customFetch, uri: "https://api.github.com/graphql" });

const link = setAuthorizationLink.concat(httpLink);

export { link, personalToken };
