"use client"

import {motion} from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import trash from "@/constants/trash.png"


interface IData  {
    _id:string,
    title:string,
    description:string,
    completed:boolean,
    createdAt:Date | undefined,
    updateAt:Date | undefined
}


const Market = ()=>{
    const [data, setData] = useState<IData[]>([])

    async function UpdateStates(task:IData) {
        await fetch(`http://localhost:8080/tasks/${task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: !task.completed,
            }),
        }).then(res=>{
            if (res.status >= 500) {
                alert("Erro ao alterar o status")
                return
            }
            loadData()
        });
    }
    async function loadData() {
        try {
            const res = await fetch("http://localhost:8080/tasks/")
            setData(await res.json())
        } catch (error) {
            setData([{"_id":"0","title":"ERRO AO CARREGAR PRODUTOS","description":"ERROR","completed":false,"createdAt":undefined,"updateAt":undefined}])
        }
    }

    async function deleteTask(task:IData) {
        await fetch(`http://localhost:8080/tasks/${task._id}`, {
            method: 'DELETE',
        }).then(res=>{
            console.log(res)
            if (res.status >= 500) {
                alert("Erro ao Excluir tarefa")
                return
            }
            loadData()
        });
    }
    useEffect(()=>{
        loadData()
    },[])


    return(
        <>
            <div className='w-full flex justify-center'>
                <a href='/task_register'>
                    <button className="bg-black p-4 mt-2 rounded-[20px] text-white">Adicionar uma nova tarefa</button>
                </a>
            </div>
            <div className=" w-full flex justify-center">
                <div className="flex flex-wrap mt-6 justify-center md:w-4/5">
                    {data.map((item)=>{
                        return(
                            <div key={item._id} className="p-1">
                                <div  className=" shadow-lg m-2 rounded-[20px] p-3">
                                    <div className="p-1">
                                        <div className="flex justify-center font-bold">
                                            {item.title}
                                        </div>
                                        <div className="flex justify-center">
                                            <p className="flex items-center text-center p-1">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="flex justify-center items-center justify-around">
                                            <div className='flex'>
                                                Completo:
                                                <div onClick={()=>UpdateStates(item)} className={`flex h-6 w-12 cursor-pointer rounded-full border border-black ${!item.completed?"bg-white justify-start":"bg-black justify-end"} p-[1px]`}>
                                                    <motion.div className={`h-5 w-5 rounded-full ${!item.completed?"bg-black":"bg-white"} bg-black`} layout transition={{type:'spring',stiffness:700,damping:30}}/>
                                                </div>
                                            </div>
                                            <div onClick={()=>{deleteTask(item)}} className=' cursor-pointer'>
                                                <Image src={trash} alt='' height={23}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Market;