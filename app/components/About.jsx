import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image src="/bake.jpg" alt="Our Bakery" width={600} height={400} className="rounded-lg w-full"/>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">About Careven Fresh</h2>
            <p className="mb-4">
              Careven Fresh has been serving the community with delicious pastries and cakes since 1990. Our passion for baking and commitment to quality ingredients sets us apart.
            </p>
            <p>
              Every day, our skilled bakers create a wide variety of treats to satisfy your sweet tooth. From custom cakes for special occasions to daily fresh bread, we take pride in every item we make.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

