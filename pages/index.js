import Head from 'next/head'
import Image from 'next/image'
import { MainLayout } from '../Components/Layouts/MainLayout'
import { startCreatePredios } from '../Hooks/useListarPrediosStore'

export default function Home() {

  const onSubmit = async() => {
    const res = await startCreatePredios()
    console.log(res)
  }

  return (
    <MainLayout>
      <h1>Informacion Predios</h1>
    </MainLayout>
  )
}
