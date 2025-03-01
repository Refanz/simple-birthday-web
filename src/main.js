import './style.css'
import interact from 'interactjs'

const dragMoveListener = (event) => {
    let target = event.target
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

const dragCake = (target) => {
    target.map((item) => {
        return (
            interact(item)
                .draggable({
                    inertia: true,
                    modifiers: [
                        interact.modifiers.restrictRect({
                            restriction: 'parent',
                            endOnly: true
                        })
                    ],
                    listeners: {
                        start(event) {
                            console.log(event.type, event.target)
                        },
                        move: dragMoveListener
                    }
                })
        )
    })
}

interact('.dropTarget')
    .dropzone({
        ondrop: (event) => {
            alert(event.relatedTarget.id + 'was dropped into ' + event.target.id)
        },
        accept: '.draggable',
    })
    .on('dropactivate', (event) => {
        event.target.classList.add('drop-activated')
    })

dragCake(['.draggable', '.draggable-1'])