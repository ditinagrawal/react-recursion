import React from "react";
import { IoFolder } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

const App = () => {
  const folders = [
    {
      name: "Home",
      folders: [
        {
          name: "Movies",
          folders: [
            { name: "Action", folders: [{ name: "IronMan.mp4" }] },
            { name: "Comedy", folders: [] },
          ],
        },
        {
          name: "Music",
          folders: [],
        },
        {
          name: "Pictures",
          folders: [{ name: "Profile.png" }, { name: "Cover.jpg" }],
        },
        {
          name: "File.txt",
        },
      ],
    },
  ];
  return (
    <main className="p-16 max-w-sm mx-auto">
      <ul className="space-y-2">
        {folders.map((folder) => (
          <Folder key={folder.name} folder={folder} />
        ))}
      </ul>
    </main>
  );
};

export default App;

function Folder({ folder }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <li key={folder.name}>
      <span className="flex items-center gap-1.5">
        {folder.folders ? (
          <span
            className="flex items-center gap-1.5 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaChevronRight
              className={`size-3 text-gray-400 ${isOpen && "rotate-90"}`}
            />
            <IoFolder className="size-5 text-sky-600 fill-current" />
            {folder.name}
          </span>
        ) : (
          <>
            <FaFile className="size-5 text-neutral-500 fill-current ml-4" />
            {folder.name}
          </>
        )}
      </span>
      {isOpen && (
        <ul className="space-y-1 ml-4">
          {folder.folders &&
            folder.folders.map((subFolder) => (
              <Folder key={subFolder.name} folder={subFolder} />
            ))}
        </ul>
      )}
    </li>
  );
}
