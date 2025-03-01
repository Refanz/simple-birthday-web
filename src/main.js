import './style.css'
import interact from 'interactjs'

const dragCake = (target) => {
    target.map((item) => {

        const position = {
            x: 0,
            y: 0
        };

        return (
            interact(item).draggable({
                listeners: {
                    start(event) {
                        console.log(event.type, event.target)
                    },
                    move(event) {
                        position.x += event.dx
                        position.y += event.dy

                        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
                    }
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
