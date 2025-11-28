import { motion } from 'framer-motion';

// Definición de las animaciones (Variantes)
const captionVariants = {
    // Estado inicial (fuera de vista y transparente)
    hidden: { y: 50, opacity: 0 },
    // Estado final (animado y visible)
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 40,
            damping: 5,
            staggerChildren: 0.3 // Escalonar la entrada de los elementos internos (h5, p)
        }
    },
};

const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
}

// Componente que contiene el contenido animado
const SlideContent = ({ title, text, isActive }) => {
    return (
        // Usamos motion.div para el contenedor de la leyenda
        // 'animate' se controla automáticamente por las 'variants' y el prop 'isActive'
        <motion.div
            className="carousel-caption d-none d-md-block"
            variants={captionVariants}
            initial="hidden"
            // Usamos el prop 'isActive' para forzar la animación entre 'visible' y 'hidden'
            animate={isActive ? "visible" : "hidden"}
        >
            <motion.h5 variants={textVariants}>{title}</motion.h5>
            <motion.p variants={textVariants}>{text}</motion.p>
        </motion.div>
    );
};

export default SlideContent;