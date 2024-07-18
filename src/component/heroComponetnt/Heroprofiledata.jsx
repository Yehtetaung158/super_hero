import React from 'react'

const Heroprofiledata = ({location}) => {
    const data = location.state.data;
  const key = location.state.key;
  const cuuent_data =data[`${key}`];
  const name = location.state.data.name;
  return (
    <div>
         <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                {name}
              </th>
            </tr>
          </thead>
          <tbody>
            {cuuent_data && (
              <>
                {Object.entries(cuuent_data).map(([key, value]) => (
                  <tr key={key}>
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-black whitespace-nowrap dark:text-white"
                    >
                      {key}
                    </th>
                    <td className="px-6 py-2">
                      {Array.isArray(value) ? (
                        <>
                          {value.map((item, index) => (
                            <div key={index} className=" inline">  /{item} /</div>
                          ))}
                        </>
                      ) : (
                        <>{value}</>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Heroprofiledata