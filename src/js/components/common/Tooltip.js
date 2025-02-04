// https://atomiks.github.io/tippyjs/

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/animations/perspective.css';

export default class Tooltip {
    constructor({ element, showOnClick = false, ...params } = {}) {
        this.element = element
        this.content = this.element.dataset.tooltipContent
        this.params = params

        this.initTooltip(showOnClick)
    }

    initTooltip(showOnClick) {
        tippy(this.element, {
            content: this.content,
            trigger: showOnClick ? 'click' : 'mouseenter focus',
            theme: isDarkMode ? 'material' : 'light',
            animation: 'perspective',
            ...this.params
        });
    }
}
