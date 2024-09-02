import React, { useState } from "react";
import { IoFolder } from "react-icons/io5";
import { FaFile, FaChevronRight } from "react-icons/fa";

const App = () => {
  const [folders, setFolders] = useState([
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
  ]);

  const addFolderOrFile = (path, name, isFolder) => {
    const add = (folders, path) => {
      if (path.length === 0) {
        folders.push(isFolder ? { name, folders: [] } : { name });
        return;
      }
      const [current, ...rest] = path;
      const folder = folders.find((f) => f.name === current);
      if (folder && folder.folders) {
        add(folder.folders, rest);
      }
    };

    setFolders((prevFolders) => {
      const newFolders = JSON.parse(JSON.stringify(prevFolders));
      add(newFolders, path);
      return newFolders;
    });
  };

  return (
    <main className="p-16 max-w-sm mx-auto">
      <ul className="space-y-2">
        {folders.map((folder) => (
          <Folder
            key={folder.name}
            folder={folder}
            addFolderOrFile={addFolderOrFile}
            path={[]}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;

function Folder({ folder, addFolderOrFile, path }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [isFolder, setIsFolder] = useState(true);

  const handleAdd = () => {
    if (!newName) {
      alert("Please enter a name");
      return;
    }
    addFolderOrFile([...path, folder.name], newName, isFolder);
    setNewName("");
  };

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
              <Folder
                key={subFolder.name}
                folder={subFolder}
                addFolderOrFile={addFolderOrFile}
                path={[...path, folder.name]}
              />
            ))}
          <li className="pt-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name here"
              className="border py-0.5 px-1 rounded-md"
            />
            <select
              value={isFolder}
              onChange={(e) => setIsFolder(e.target.value === "true")}
            >
              <option value="true">Folder</option>
              <option value="false">File</option>
            </select>
            <button
              onClick={handleAdd}
              className="ml-2 mt-2 py-1 px-2 bg-blue-500 rounded text-white"
            >
              Add
            </button>
          </li>
        </ul>
      )}
    </li>
  );
}
