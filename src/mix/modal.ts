import { Modal, ModalFuncProps, notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

function showModal<T extends Exclude<ModalFuncProps['type'], undefined>>(fn: T, title: string, content: string | JSX.Element) {
  return new Promise<boolean>(resolve => {
    Modal[fn]({
      title,
      content,
      onOk() {
        resolve(true);
      },
      onCancel() {
        resolve(false);
      },
    });
  });
}

function showModalConfirm(...args: [string, string]) {
  return showModal('confirm', ...args);
}

function showNotificationError(props: Omit<ArgsProps, 'duration' | 'placement'>) {
  notification.error({ ...props, duration: 10, placement: 'bottomRight' });
}

export { showModalConfirm, showNotificationError };
