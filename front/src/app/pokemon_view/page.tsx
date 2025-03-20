"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes"
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

interface Ipokemon{
    id:number
    name:string,
    height:number,
    weight:number
}

export default function registerProduct() {
    const router = useRouter()
    const [pokemons, setPokemons] = useState<Ipokemon[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/team', {
                    method: 'GET',
                });
                let a :{data:{id:number}[]}= await response.json()
                console.log(a)
                let pokemons = a.data.map(async (pokemon)=>{
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
                    let data = await res.json()
                    return {id:pokemon.id,name:data.name,height:data.height,weight:data.weight}
                })
                setPokemons(await Promise.all(pokemons))
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <button className="bg-black mt-2 rounded-[10px] text-white p-3 ml-24 mt-8" onClick={()=>{router.push(ROUTES.pokemonHome)}}>Capturar Pokemons</button>
            <div className="w-full flex justify-center">
                <div className=" flex flex-col justify-center aling-center mt-6 mb-6 w-5/6">
                    <label htmlFor="Name" className="text-white text-medium m-1">Pokemons Capturados:</label>
                    <div className="flex flex-wrap p-6 rounded-md justify-center">
                        {pokemons.map((pokemon,index)=>{
                            return(
                                <div  key={index} className="p-1 w-[300px] flex justify-center">
                                    <div  className=" shadow-lg m-2 rounded-[20px]">
                                        <div>
                                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="" width={300} height={300} className="object-cover  w-[300px] h-[300px] rounded-t-[15px]"/>
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
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}