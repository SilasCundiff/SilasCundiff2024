'use client'
import Card from './Card'
import { createContext, useState } from 'react'

export const DraggingContext = createContext({
  isDragging: false,
  setIsDragging: (isDragging: boolean) => {},
})

export default function CardGameExperience() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <>
      <DraggingContext.Provider value={{ isDragging, setIsDragging }}>
        <Card color='#ff0' positions={[0, -2, 0]} />
        <Card color='#f00' positions={[-2, -2, 0]} />
        <Card color='#f0f' positions={[-4, -2, 0]} />
        <Card color='#0ff' positions={[2, -2, 0]} />
        <Card color='#0f0' positions={[4, -2, 0]} />
        <mesh position={[-2.5, 1, 0]}>
          <planeGeometry args={[1.75, 2.5, 1]} />
          <meshBasicMaterial color='#000' />
        </mesh>
      </DraggingContext.Provider>
    </>
  )
}
