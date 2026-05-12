'use client';

import React from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean; // optional: hide on md
  mobileLabel?: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
}) => {
  const visibleColumns = columns.filter(col => !col.hideOnMobile);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      
      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="block sm:hidden">
        {data.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500 text-sm">
            No data available
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {data.map((row, index) => (
              <div key={row.id || index} className="p-4 space-y-3">
                {visibleColumns.map((column) => (
                  <div
                    key={column.key}
                    className="flex justify-between items-start gap-3"
                  >
                    <span className="text-sm font-medium text-gray-500">
                      {column.mobileLabel || column.label}
                    </span>
                    <div className="text-sm text-gray-900 text-right break-words max-w-[60%]">
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </div>
                  </div>
                ))}

                {(onEdit || onDelete) && (
                  <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-blue-600 cursor-pointer hover:text-blue-800 text-xs font-medium"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-600 cursor-pointer hover:text-red-800 text-xs font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= DESKTOP TABLE VIEW ================= */}
      <div className="hidden sm:block">
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto divide-y divide-gray-200 text-sm">
            
            {/* Header */}
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider
                      ${column.hideOnMobile ? 'hidden md:table-cell' : ''}
                      ${column.hideOnTablet ? 'hidden lg:table-cell' : ''}
                    `}
                  >
                    {column.label}
                  </th>
                ))}

                {(onEdit || onDelete) && (
                  <th className="px-4 py-3 text-right font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="bg-white divide-y divide-gray-100">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr
                    key={row.id || index}
                    className="hover:bg-gray-50 transition"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-4 py-4 align-top text-gray-800
                          ${column.hideOnMobile ? 'hidden md:table-cell' : ''}
                          ${column.hideOnTablet ? 'hidden lg:table-cell' : ''}
                        `}
                      >
                        <div className="break-words whitespace-normal">
                          {column.render
                            ? column.render(row[column.key], row)
                            : row[column.key]}
                        </div>
                      </td>
                    ))}

                    {(onEdit || onDelete) && (
                      <td className="px-4 py-4 text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="text-blue-600 cursor-pointer hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition text-sm"
                            >
                              Edit
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="text-red-600 cursor-pointer hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition text-sm"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
