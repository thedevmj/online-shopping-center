import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      
  
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add Book
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Name
            </label>
            <input
              type="text"
              placeholder="Book name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Author
            </label>
            <input
              type="text"
              placeholder="Book author"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Price            </label>
            <input
              type="text"
              placeholder="Book price"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Publish Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Submit
          </button>
        </div>
      </div>

    
      <div className="w-full max-w-4xl my-10 overflow-x-auto">
        <table className="w-full border border-gray-300 text-left bg-white ">
          <thead className="bg-amber-200">
            <tr>
              <th className="px-4 py-3">Book Name</th>
              <th className="px-4 py-3">Book Title</th>
              <th className="px-4 py-3">Book Author</th>
              <th className="px-4 py-3">Book Date</th>
             
            </tr>
          </thead>

          <tbody className="divide-y ">
            <tr className="hover:bg-gray-100">

              <td className="px-4 py-3">name1</td>
              <td className="px-4 py-3">name2</td>
              <td className="px-4 py-3">name3</td>
              <td className="px-4 py-3">name4</td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
