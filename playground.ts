// type Person ={
//   name:string
//   age: number
// }

// interface Person{
//   name: string
//   age: number
// }
class Person{
  name:string
  age:number
  constructor(name: string, age: number){
    this.name = name
    this.age = age
  }
}

// interface PersonLoggerFn{
//   (name:string, age: number): string
// }

interface Person{
  name: string
  age: number
}

interface BusinessPerson extends Person{
  salary:number
}

interface AcademicPerson extends Person{
  publications: string[]
}

type PersonLoggerFn = (name:string, age: number) => string


type Car ={
  name: string
} & RaceCar

type RaceCar ={
  speed:number
} 

type RaceCar2 ={
  name:string
  maxSpeead:number
}

type CityCar ={
  name: string
  space: string
}



export default function play(){
  type Type4 = string[][number]

  const names: string[] = ['Filip', 'John']
  const numbers: Array<number> = [1,2,3,4,5]
  const random = Math.random() > 0.5 ? 'hell' : [1,2]
  
  const name = 'Cesar'
  const age = 30

  const person2:AcademicPerson ={
    name:'Cesar',
    age: 23,
    publications: ['1','2']
  }

  const person3:BusinessPerson = {
    name:'Daniel',
    age:30,
    salary: 1000
  }

  const person = {
    name: 'Cesar',
    age: 30
  }

  if(typeof random === 'string'){
    const upper = random.toUpperCase()
  } else {
    console.log(random)
  }

  function logPerson(person: Person){

  }

  logPerson(person2)

  const car:Car ={
    name: 'my car',
    speed: 100
  }
  
  function logCarInfo(car: RaceCar2 | CityCar){
    
  }

  // function logPersonInfo(personName:string, personAge:number){
  //   // const info = "Name: " + personName + ", age: " + personAge
  //   const info = `Name: ${personName}, age: ${personAge}`
  //   console.log(info)
  //   return info
  // }

  const logPersonInfo:PersonLoggerFn = (
      personName:string, 
      personAge:number
    ):string => {
    const info = `Name: ${personName}, age: ${personAge}`
    console.log(info)
    return info
  }

  function logPersonInfo2(person: Person): string{
    // const info = "Name: " + personName + ", age: " + personAge
    const info = `Name: ${person.name}, age: ${person.age}`
    console.log(info)
    return info
  }

  logPersonInfo(name, age)
  logPersonInfo2(new Person('Cesar', 50))
}