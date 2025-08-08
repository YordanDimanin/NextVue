

const Card = () => {
  return (
    <div className="flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-s-lg" src="#" alt="Jumanji"></img>
        <div className="flex flex-col justify-between p-4 md:p-8 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-white">Jumanji</h5>
            <p className="mb-3 font-normal text-gray-700 md:text-lg dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, officiis.</p>

        </div>
    </div>
  )
}

export default Card