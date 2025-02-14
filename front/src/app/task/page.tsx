import Image from "next/image"


type IData = {
    id:number,
    name:string,
    description:string,
    price:number,
    stock:number
}


const Market = async ()=>{
    var data:IData[] = []

    try {
        const res = await fetch("http://localhost:8080/products/")
        data = await res.json()
    } catch (error) {
        data = [{"id":0,"name":"ERRO AO CARREGAR PRODUTOS","description":"ERROR","price":0,"stock":0}]
    }
    return(
        <>
            <div className=" w-full flex justify-center">
                <div className="flex flex-wrap mt-6 justify-center md:w-4/5">
                    {data.map((item)=>{
                        return(
                            <div key={item.id} className="p-1">
                                <div  className=" shadow-lg m-2 rounded-[20px] p-3">
                                    <div className="p-1">
                                        <div className="flex justify-center font-bold">
                                            {item.name}
                                        </div>
                                        <div className="flex justify-center">
                                            <p className="flex items-center text-center p-1">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="flex justify-center">
                                            <p className="flex items-center font-semibold text-center p-1">
                                                R${item.price}
                                            </p>
                                        </div>
                                        <div className="flex justify-center">
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