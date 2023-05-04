import { z } from 'zod'

/* ZOD PRESENTATION */

const UserSchema = z.object({
  username: z.string(),
})

const user = { username: 'bob' }
// replace string with number

console.log(UserSchema.parse(user))

// Infer type

type UserType = z.infer<typeof UserSchema>




/* SIMULATING TYPE CHECKING AT RUNTIME */

interface Square {
  kind: string;
  width: number;
}

interface Rectangle {
  kind: string;
  width: number;
  height: number;
}

const mySquare = { kind: 'square', width: 10 }
const myRectangle = { kind: 'rectangle', width: 10, height: 30 }

/* BY PROPERTY CHECK */

const calculateArea_PropertyCheck = (shape: Square | Rectangle) => {
  if ('height' in shape) {
    console.log(shape.width * (shape as Rectangle).height)
  } else {
    console.log(shape.width * shape.width)
  }
}

// calculateArea_PropertyCheck(myRectangle)

/* BY TAGGED UNION */

const calculateArea_TaggedUnion = (shape: Square | Rectangle) => {
  if (shape.kind === 'rectangle') {
    console.log(shape.width * (shape as Rectangle).height)
  } else {
    console.log(shape.width * shape.width)
  }
}

// calculateArea_TaggedUnion({ kind: 'rectangle', width: 10, height: 3})

/* WITH TYPE GUARD */

function isRectangle(shape: Square | Rectangle): shape is Rectangle {
  return (shape as Rectangle).height !== undefined;
}

const calculateArea_TypeGuard = (shape: Square | Rectangle) => {
  if (isRectangle(shape)) {
    console.log(shape.width * (shape as Rectangle).height)
  } else {
    console.log(shape.width * shape.width)
  }
}

// calculateArea_TypeGuard(myRectangle)

/* WITH ZOD */

const SquareSchema = z.object({
  width: z.number(),
  height: z.never(),
})

const RectangleSchema = z.object({
  width: z.number(),
  height: z.number(),
})

const calculateArea_WithZod = (shape: Square | Rectangle) => {
  const parsedSquare = SquareSchema.safeParse(shape);
  if (parsedSquare.success) {
    console.log(shape.width * shape.width)
  } else {
    console.log(shape.width * (shape as Rectangle).height)
  }
}

// calculateArea_WithZod(myRectangle)

