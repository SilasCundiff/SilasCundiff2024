import { Euler, Vector3 } from 'three'
import Card from './Card'
import { useDeckAndHandContext } from '@/helpers/contexts/DeckAndHandContext'
import { CARD_HEIGHT, CARD_WIDTH } from '@/helpers/constants'
import { animated, useSpringRef, useTransition } from '@react-spring/three'
import { useEffect } from 'react'
import { useBounds } from '@react-three/drei'

export default function Hand() {
  const { hand } = useDeckAndHandContext()
  const bounds = useBounds()
  const cardsInHandPositions = [
    new Vector3(-2, -2.4, 1.3),
    new Vector3(-1, -2.15, 1.2),
    new Vector3(0, -2, 1.1),
    new Vector3(1, -2.15, 1.4),
    new Vector3(2, -2.4, 1.5),
  ]
  const cardsInHandRotations = [
    new Euler(0, 0, 0.25),
    new Euler(0, 0, 0.15),
    new Euler(0, 0, 0),
    new Euler(0, 0, -0.15),
    new Euler(0, 0, -0.25),
  ]
  // hand &&
  //   hand.map(({ id, color }, index) => {
  //     const cardPosition = cardsInHandPositions[index]
  //     cardPosition.z = 0.01 * index + 0.01 // fix z-fighting
  //     return (
  //       <Card
  //         key={id}
  //         cardId={id}
  //         index={index}
  //         color={color}
  //         position={cardPosition}
  //         rotation={cardsInHandRotations[index]}
  //         cardWidth={CARD_WIDTH}
  //         cardHeight={CARD_HEIGHT}
  //       />
  //     )
  //   })
  const transitionRef = useSpringRef()
  const transition = useTransition(hand, {
    ref: transitionRef,
    keys: hand.map(({ id }) => id),
    from: { position: new Vector3(-window.innerWidth, -window.innerHeight, 0), rotation: new Euler(0, 0, 0) },
    enter: (card) => {
      const index = hand.indexOf(card)
      console.log('index', index, card, cardsInHandPositions[index])
      return { position: cardsInHandPositions[index], rotation: cardsInHandRotations[index] }
    },
    leave: { position: new Vector3(window.innerWidth, window.innerHeight, 0), rotation: new Euler(0, 0, 0) },
    update: (card) => {
      const index = hand.indexOf(card)
      return { position: cardsInHandPositions[index], rotation: cardsInHandRotations[index] }
    },
    config: {
      mass: 5,
      friction: 120,
      tension: 120,
    },
    trail: 100,
  })
  // console.log('hand', hand, transitionRef, transition)

  useEffect(() => {
    transitionRef.start()
  }, [hand, transitionRef])

  return (
    <group>
      {transition((props, card) => {
        return (
          <animated.group position={props.position} rotation={props.rotation}>
            <Card
              key={card.id}
              cardId={card.id}
              index={hand.indexOf(card)}
              color={card.color}
              cardWidth={CARD_WIDTH}
              cardHeight={CARD_HEIGHT}
            />
          </animated.group>
        )
      })}
    </group>
  )
}
