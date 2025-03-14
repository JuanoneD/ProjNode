"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes"
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

interface poke{
    id:number,
    name:string,
    height:number,
    weight:number
}

export default function registerProduct() {
    const [name, setName] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const [pokemon,setPokemon] = useState<poke|undefined>()
    const router = useRouter()

    const NewProduct = async () => {
        if(name==""){
            setError(true)
            return
        }
        try {
            setPokemon(await(await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)).json());
            const response = await fetch(`http://localhost:8080/capture/${name}`, {
                method: 'POST',
            });
            console.log(response)
            if (response.status >= 500) {
                setError(true)
                return
            }
            let a = await response.json()
            console.log(a)
            setError(false)
            alert(a.message)
        } catch (err) {
            console.log(err)
            setError(true)
        }
    };

    return (
        <>
            <div className=" flex justify-center aling-center mt-6 mb-6">
                <div className="flex flex-col p-6 rounded-md w-4/5 md:w-1/3">
                    <label htmlFor="Name" className="text-white text-medium m-1">Digite o id do pokemon que deseja capturar:</label>
                    <input type="text" name="Name" placeholder="Digite o id do pokemon" className="p-2 border-2 text-small text-black rounded-[10px]" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <button className="bg-black mt-2 rounded-[10px] text-white p-3" onClick={()=>{NewProduct()}}>Capturar!</button>
                </div>
            </div>
            <div className="flex justify-center">
                {pokemon&&
                    <div className="p-1 w-[300px] flex justify-center">
                    <div  className=" shadow-lg m-2 rounded-[20px]">
                        <div>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`} alt="" width={300} height={300} className="object-cover  w-[300px] h-[300px] rounded-t-[15px]" priority={true}/>
                        </div>
                        <div className="p-1">
                            <div className="flex justify-center font-bold">
                                {pokemon.name}
                            </div>
                            <div className="flex justify-center">
                                <p className="flex items-center text-center p-1">
                                    Altura: {pokemon.height}
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <p className="flex items-center font-semibold text-center p-1">
                                    Peso: {pokemon.weight}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        </>
    );
}