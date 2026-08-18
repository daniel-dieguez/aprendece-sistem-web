import React from 'react'
import {Button} from "@heroui/react";


export default function list() {
  return (
    <div>
      
      <h1>holaaaa</h1>
      <div className="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="danger-soft">Danger Soft</Button>
    </div>
      
      </div>
  )
}
