import Card from './Card'

export default function Hand({ currentHand }: { currentHand: any[] }) {
  return (
    <group>
      {currentHand.map(({ id, color, positions }) => (
        <Card key={id} cardId={id} color={color} positions={positions} />
      ))}
    </group>
  )
}
