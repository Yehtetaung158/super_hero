import React from 'react'

const Heroprofiledata = ({name,cuuent_data,datapowerstats}) => {
  
  return (
    <div>
         <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            {cuuent_data  ? (
              <>
                {Object.entries(cuuent_data).map(([key, value]) => (
                  <tr key={key}>
                    <th
                      scope="row"
                      className="px-1 py-2 font-medium text-black whitespace-nowrap dark:text-white"
                    >
                      {key}
                    </th>
                    <td className="px-1 py-2">
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
              </>) : <>
              {datapowerstats && <>
                {Object.entries(datapowerstats).map(([key, value]) => (
                  <tr key={key}>
                    <th
                      scope="row"
                      className="px-1 py-2 font-medium text-black whitespace-nowrap dark:text-white"
                    >
                      {key}
                    </th>
                    <td className="px-1 py-2">
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
              </>}
              </>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Heroprofiledata