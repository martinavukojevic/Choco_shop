import { motion } from "framer-motion";
import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-start mb-10"
    >
      <h2 className="text-[2.25rem] sm:text-[2.75rem] font-serif tracking-wide flex items-center flex-wrap text-cocoa">
        <span className="font-playfair">{text1}</span>
        <span className="italic ml-2 font-playfair">{text2}</span>
      </h2>

      
    </motion.div>
  );
};

export default Title;
