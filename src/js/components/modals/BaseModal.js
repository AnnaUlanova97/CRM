import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export default class BaseModal {
  constructor() {
  }

  static showModalContent(content, options = {}) {
    const userOptions = {}

    if (options.done instanceof Function) {
      userOptions.done = options.done
    }

    return new Fancybox([
      {
        src: content,
        type: 'html',
      }
    ], {
      on: {
        ...userOptions,
      }
    })
  }

  static showModal(modelID = '', config = {}) {
    return Fancybox.show([
        {
          src: modelID,
          type: 'inline',
        },
      ], {
        ...config,
      },
    );
  }
}
