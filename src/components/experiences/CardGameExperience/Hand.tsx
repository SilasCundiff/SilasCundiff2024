import { Euler, Vector3 } from 'three'
import Card from './Card'
import { useDeckAndHandContext } from '@/helpers/contexts/DeckAndHandContext'
import { CARD_HEIGHT, CARD_WIDTH } from '@/helpers/constants'
import { useSpringRef, useTransition } from '@react-spring/three'
import { useEffect } from 'react'

export default function Hand() {
  const { hand } = useDeckAndHandContext()

  const cardsInHandPositions = [
    new Vector3(-2, -4.5, 1.5),
    new Vector3(-1, -4.25, 1.4),
    new Vector3(0, -4.1, 1.3),
    new Vector3(1, -4.25, 1.2),
    new Vector3(2, -4.5, 1.1),
  ]
  const cardsInHandRotations = [
    new Euler(0, 0, 0.25),
    new Euler(0, 0, 0.15),
    new Euler(0, 0, 0),
    new Euler(0, 0, -0.15),
    new Euler(0, 0, -0.25),
  ]

  const transitionRef = useSpringRef()

  const transition = useTransition(hand, {
    ref: transitionRef,
    keys: hand.map(({ id }) => id),
    from: (card) => {
      const index = hand.indexOf(card)
      return {
        position: new Vector3(-5, -4.5, 0.95).toArray(),
        rotation: cardsInHandRotations[index],
        scale: 0.1,
      }
    },
    enter: (card) => {
      const index = hand.indexOf(card)
      return {
        position: cardsInHandPositions[index].toArray(),
        rotation: cardsInHandRotations[index],
        scale: 1,
      }
    },
    leave: (card) => {
      const index = hand.indexOf(card)
      return {
        position: new Vector3(5, -4.5, 0.95).toArray(),
        rotation: cardsInHandRotations[index],
        scale: 0.1,
        opacity: 0,
      }
    },
    config: {
      mass: 2,
      friction: 40,
      tension: 360,
      precision: 0.0001,
    },
    trail: 100,
  })

  useEffect(() => {
    transitionRef.start()

    return () => {
      transitionRef.stop()
    }
  }, [hand, transitionRef])

  return (
    <group>
      {transition((props, card) => {
        return (
          // @ts-ignore
          <>
            <Card
              key={card.id}
              cardId={card.id}
              index={hand.indexOf(card)}
              color={card.color}
              cardWidth={CARD_WIDTH}
              cardHeight={CARD_HEIGHT}
              description={card.description}
              title={card.title}
              imageUrl={card.imageUrl}
              // @ts-ignore
              siteUrl={card.siteUrl}
              techStack={card.techStack}
              // @ts-ignore
              position={props.position}
              // @ts-ignore
              rotation={props.rotation}
              // @ts-ignore
              scale={props.scale}
            />
          </>
        )
      })}
    </group>
  )
}
