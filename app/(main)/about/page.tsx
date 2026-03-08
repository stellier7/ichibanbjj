export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-black">Sobre Ichiban</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Ichiban Jiu Jitsu es una academia de artes marciales de clase mundial ubicada en el corazón de Tegucigalpa, Honduras.
            Fundada con la visión de llevar el arte del Jiu Jitsu brasileño y el Muay Thai a nuestra comunidad, nos dedicamos
            a proporcionar entrenamiento de la más alta calidad.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Nuestra Misión</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Nuestra misión es desarrollar no solo habilidades físicas, sino también disciplina, respeto, confianza y
            carácter en cada estudiante. Creemos que las artes marciales son un camino hacia el crecimiento personal
            y el desarrollo integral.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Nuestros Valores</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6">
            <li>Respeto hacia uno mismo y hacia los demás</li>
            <li>Disciplina y dedicación en el entrenamiento</li>
            <li>Excelencia en la enseñanza</li>
            <li>Comunidad y apoyo mutuo</li>
            <li>Mejora continua</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Nuestros Instructores</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Contamos con instructores altamente calificados y experimentados que están comprometidos con el éxito
            de cada estudiante. Nuestro equipo está dedicado a proporcionar instrucción personalizada y apoyo
            en cada paso del camino.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Únete a Nosotros</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Ya seas un principiante completo o un practicante experimentado, hay un lugar para ti en Ichiban.
            Ofrecemos clases para todos los niveles y edades. Tu primera clase es gratis, así que no tienes
            nada que perder.
          </p>
        </div>
      </div>
    </div>
  );
}
