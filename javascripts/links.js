var linkState

require(['gitbook', 'jquery'], function (gitbook, $) {
  function createLink(link) {
    return `
      <a class="btn pull-right js-toolbar-action" aria-label="${link.name}" href="${link.url}" target="_blank">
        <i class="${link.icon}"></i>
      </ a>
    `
  }

  function appendFontAwesome() {
    var $fontAwesome = `
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
        crossorigin="anonymous"
      />
    `
    $(document.head).append($fontAwesome)
  }

  function appendIcons(links) {
    const $linksGroup = $('<div/>', { class: 'pull-right js-toolbar-action' })
    $linksGroup.append(
      links
        .slice()
        .reverse()
        .map((link) => createLink(link))
    )

    $('.book-header').prepend($linksGroup)
  }

  gitbook.events.bind('start', function (e, config) {
    linkState = config.links || []
    appendFontAwesome()
  })

  gitbook.events.bind('page.change', function (e, config) {
    setTimeout(function () {
      appendIcons(linkState)
    })
  })
})
