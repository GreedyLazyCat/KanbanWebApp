import gsap from 'gsap'
export function openingAnimation(duration: number) {
    gsap.fromTo('.kanban-tool__logo div h1',
        {
            x: -50,
            opacity: 0.0
        },
        {
            x: 0,
            opacity: 1.0,
            duration: duration
        });
    gsap.fromTo('.line-separator',
        {
            height: '0rem'
        },
        {
            height: '4rem',
            duration: duration
        });
    gsap.fromTo('.logo',
        {
            x: 50,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: duration
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
            duration: duration,
        }
    )
}

export function animateGetStarted(duration: number) {
    let ease: string = 'expo.out'

    gsap.to('.kanban-body',
        {
            duration: duration,
            overflow: 'visible',
            flexBasis: '95%',
            height: '90%', 
            ease: ease
        }
    )
    gsap.to('.kanban-tool',
        {
            duration: duration,
            flexBasis: '5%',
            ease: ease
        }
    )
    gsap.fromTo('.get-started-btn',
        {
            position: 'absolute'
        },
        {
            ease: ease,
            display: 'none',
            opacity: 0,
            duration: duration,
            scale: '0%'
            // y: -100
        }
    )
    gsap.to('.kanban-tool__logo ',
        {
            duration: duration,
            ease: ease,
            flexBasis: '20%'
        }
    )
    gsap.to('.kanban-tool__logo h1',
        {
            ease: ease,
            duration: duration,
            fontSize: '2rem'
        }
    )
    gsap.to('.kanban-tool img',
        {
            ease: ease,
            duration: duration,
            width: '3rem',
            height: '3rem'
        }
    )
    gsap.to('.line-separator',
        {
            ease: ease,
            duration: duration,
            height: '2rem'
        }
    )
    gsap.to('.kanban-tool__logo div',
        {
            duration: duration,
            ease: ease,
            gap: '0.5rem'
        }
    )
    gsap.to('.kanban-tool__ctrls',
        {
            duration: duration,
            ease: ease,
            flexBasis: '50%',
        }
    )
    gsap.to('.header-bottom-border',
        {
            width: '70%',
            duration: duration,
        }
    )
}

// export default {animateGetStarted}

