import { useState } from "react";
import { motion } from "framer-motion";
import ItemForm from "./ItemForm";

type Props = {
  refreshItems: () => void;
};

export default function ItemFormCard({ refreshItems }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`bg-white border rounded-xl shadow-sm p-4 
        ${expanded ? 'col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2' : 'flex items-center justify-center cursor-pointer'}`}
      onClick={() => !expanded && setExpanded(true)}
    >
      {!expanded ? (
        <button className="text-blue-500 text-xl font-semibold">
          + Add New Item
        </button>
      ) : (
        <div className="w-full" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Add New Item</h2>
            <button
              className="text-sm text-gray-500 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
            >
              Cancel
            </button>
          </div>
          <ItemForm
            refreshItems={() => {
              refreshItems();
              setExpanded(false);
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
