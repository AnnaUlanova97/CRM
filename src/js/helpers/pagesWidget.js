const pagesWidget = (pages = []) => {
    const widgetTail = document.createElement('div')
    const widgetList = document.createElement('div')
    const widgetItems = pages.map((page) => {
        const link = document.createElement('a')

        return Object.assign(link, {
            href: `/${page}.html`,
            textContent: page
        })
    })

    Object.assign(widgetTail.style, {
        position: 'absolute',
        right: '0',
        left: '100%',
        top: '0',
        width: '30px',
        height: '30px',
        background: 'rgba(0, 0, 0, .8)',
        backgroundImage: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '0 0 8px 0'

    })

    widgetList.classList.add('pages-widget')
    widgetList.appendChild(widgetTail)

    widgetList.append(Object.assign(document.createElement('a'), {
        href: '/ui-kit.html',
        textContent: 'UI Kit'
    }))

    widgetList.append(document.createElement('hr'))

    widgetItems.forEach((a) => widgetList.append(a))

    widgetList.querySelectorAll('a, hr').forEach((item) => {
        Object.assign(item.style, {
            color: '#fff',
            textDecoration: 'none',
            margin: '0'
        })
    })

    Object.assign(widgetList.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: '100',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        background: 'rgba(0, 0, 0, .8)',
        padding: '20px',
        borderRadius: '0 0 8px 0',
        transform: 'translateX(-100%)',
        transition: 'transform .3s ease'
    })

    widgetList.onmouseover = () => widgetList.style.transform = 'translateX(0)'
    widgetList.onmouseout = () => widgetList.style.transform = 'translateX(-100%)'

    document.body.append(widgetList)
}

export default pagesWidget
