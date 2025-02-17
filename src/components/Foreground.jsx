import { useRef, useState } from "react";
import Card from "./Card";
import { IoMdAdd } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const Foreground = () => {
  const pageRef = useRef();
  const [cards, setCards] = useState([
    {
      id: 1,
      desc: "Project report on AI advancements",
      fileSize: "2",
      fileUnit: "MB",
      fileType: ".pdf",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newCard, setNewCard] = useState({
    desc: "",
    fileSize: "",
    fileUnit: "",
    fileType: "",
  });

  const addCard = () => {
    if (newCard.desc && newCard.fileSize && newCard.fileType) {
      setCards([
        ...cards,
        {
          id: Date.now(),
          desc: newCard.desc,
          fileSize: newCard.fileSize,
          fileUnit: newCard.fileUnit,
          fileType: newCard.fileType,
        },
      ]);
      setNewCard({ desc: "", fileSize: "", fileType: "", fileUnit: "" });
      setShowForm(false);
    } else {
      alert("Fill all the details");
    }
  };

  const toggleDone = (id) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, done: !card.done } : card
      )
    );
  };

  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };
  const handleCloseCard = () => {
    setShowForm(false);
  };
  return (
    <div
      ref={pageRef}
      className="fixed top-0 left-0 z-[3] w-full h-full flex flex-wrap p-5 gap-10"
    >
      {cards.map((item) => (
        <Card
          key={item.id}
          data={item}
          reference={pageRef}
          toggleDone={toggleDone}
          deleteCard={deleteCard}
        />
      ))}

      {showForm && (
        <motion.div
          drag
          dragConstraints={pageRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900/90 p-6 rounded-lg shadow-xl w-80"
        >
          <div className="flex justify-between items-center text-white mb-4 ">
            <h2 className="text-white ">Add New Card</h2>
            <IoCloseCircleOutline
              className="cursor-pointer"
              onClick={handleCloseCard}
            />
          </div>

          <input
            type="text"
            placeholder="Description"
            value={newCard.desc}
            onChange={(e) => setNewCard({ ...newCard, desc: e.target.value })}
            className="border border-zinc-700 bg-zinc-800 text-white p-2 rounded w-full outline-none focus:ring-2 focus:ring-zinc-500"
          />
          <div className="flex justify-center items-center gap-2">
            <input
              type="number"
              placeholder="File Size"
              value={newCard.fileSize}
              onChange={(e) =>
                setNewCard({ ...newCard, fileSize: e.target.value })
              }
              className="border border-zinc-700 bg-zinc-800 text-white p-2 rounded w-full mt-3 outline-none focus:ring-2 focus:ring-zinc-500"
            />
            <select
              value={newCard.fileUnit}
              onChange={(e) =>
                setNewCard({ ...newCard, fileUnit: e.target.value })
              }
              className="border border-zinc-700 bg-zinc-800 text-white p-2 rounded w-full mt-3 outline-none focus:ring-2 focus:ring-zinc-500"
            >
              <option value="">Select unit</option>
              <option value="KB">KB</option>
              <option value="MB">MB</option>
              <option value="GB">GB</option>
            </select>
          </div>
          <select
            value={newCard.fileType}
            onChange={(e) =>
              setNewCard({ ...newCard, fileType: e.target.value })
            }
            className="border border-zinc-700 bg-zinc-800 text-white p-2 rounded w-full mt-3 outline-none focus:ring-2 focus:ring-zinc-500"
          >
            <option value="">Select file type</option>
            <option value=".txt">.txt</option>
            <option value=".csv">.csv</option>
            <option value=".xlsx">.xlsx</option>
            <option value=".pdf">.pdf</option>
            <option value=".doc">.doc</option>
            <option value=".ppt">.ppt</option>
            <option value=".zip">.zip</option>
            <option value=".json">.json</option>
          </select>
          <button
            onClick={addCard}
            className="bg-zinc-600 text-white p-2 rounded w-full mt-4 hover:bg-zinc-400 transition"
          >
            Add
          </button>
        </motion.div>
      )}

      <button
        onClick={() => setShowForm(true)}
        className={`fixed justify-center bottom-10 right-10 bg-zinc-600 text-white rounded-full p-4 `}
      >
        <IoMdAdd size="1.5rem" className="cursor-pointer" />
      </button>
    </div>
  );
};

export default Foreground;
