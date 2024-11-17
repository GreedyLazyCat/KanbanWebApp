import gsap from 'gsap'
export function openingAnimation() {
    gsap.fromTo('.kanban-tool__logo div h1',
        {
            x: -50,
            opacity: 0.0
        },
        {
            x: 0,
            opacity: 1.0,
            duration: 1
        });
    gsap.fromTo('.line-separator',
        {
            height: '0rem'
        },
        {
            height: '4rem',
            duration: 1
        });
    gsap.fromTo('.logo',
        {
            x: 50,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 1
        }
    )
    gsap.fromTo('.get-started-btn',
        {
            y: 100,
            opacity: 0,
            // height: 0
        },
        {
            y: 0,
            opacity: 1,
            // height: 'fit-content',
            duration: 1,
        }
    )
}

export function animateGetStarted() {
    gsap.to('.kanban-select-body',
        {
            duration: 1,
            overflow: 'hidden',
            flexBasis: '90%'
        }
    )
    gsap.to('.kanban-tool',
        {
            duration: 1,
            flexBasis: '10%'
        }
    )
    gsap.fromTo('.get-started-btn',
        {
            position: 'absolute'
        },
        {
            display: 'none',
            opacity: 0,
            duration: 1,
            scale: '0%'
            // y: -100
        }
    )
    gsap.to('.kanban-tool__logo ',
        {
            duration: 1,
            flexBasis: '20%'
        }
    )
    gsap.to('.kanban-tool__logo h1',
        {
            duration: 1,
            fontSize: '2rem'
        }
    )
    gsap.to('.kanban-tool img',
        {
            duration: 1,
            width: '3rem',
            height: '3rem'
        }
    )
    gsap.to('.line-separator',
        {
            duration: 1,
            height: '2rem'
        }
    )
    gsap.to('.kanban-tool__logo div',
        {
            duration: 1,
            gap: '0.5rem'
        }
    )
    gsap.to('.kanban-tool__ctrls',
        {
            duration: 1,
            flexBasis: '50%',
        }
    )
}

// export default {animateGetStarted}

