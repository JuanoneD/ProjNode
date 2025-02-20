"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes"
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function registerProduct() {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const router = useRouter()

    const NewProduct = async () => {
        if(name=="" || description==""){
            setError(true)
            return
        }
        try {
            const response = await fetch('http://localhost:8080/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: name,
                    description: description,
                }),
            });
            console.log(response)
            if (response.status >= 500) {
                setError(true)
                return
            }
            let a = await response.json()
            console.log(a)
            setError(false)
            alert("Cadastrado com sucesso!!")
            router.push(ROUTES.task)
        } catch (err) {
            console.log(err)
            setError(true)
        }
    };

    return (
        <>
            <div className=" flex justify-center aling-center mt-6 mb-6">
                <div className="flex flex-col p-6 rounded-md w-4/5 md:w-1/3">
                    <label htmlFor="Name" className="text-black text-medium">Nome da tarefa:</label>
                    <input type="text" name="Name" placeholder="Digite o nome da tarefa" className="p-2 border-2 text-small text-black" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <label htmlFor="description" className="text-black text-medium">Descrição:</label>
                    <input type="text" name="description" placeholder="Digite a descrição da tarefa" className="p-2 text-small text-black border-2" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    {error && <div className="text-red-950">Erro ao cadastrar Produto!!</div>}
                    <button type="submit" className="bg-black mt-6 rounded-[10px] text-white p-3" onClick={() => { NewProduct() }}>Cadastrar nova tarefa</button>
                </div>
            </div>
        </>
    );
}