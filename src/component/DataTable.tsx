import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSelectRow = (row: T) => {
    let newSelection: T[];
    if (selectedRows.includes(row)) {
      newSelection = selectedRows.filter((r) => r !== row);
    } else {
      newSelection = [...selectedRows, row];
    }
    setSelectedRows(newSelection);
    onRowSelect?.(newSelection);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!data || data.length === 0)
    return <div className="p-4">No Data Available</div>;

  return (
    <table className="table-auto border-collapse border border-gray-400 w-full">
      <thead>
        <tr>
          {selectable && <th className="border px-4 py-2">Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              className={`border px-4 py-2 ${
                col.sortable ? "cursor-pointer select-none" : ""
              }`}
              onClick={() =>
                col.sortable &&
                setSortConfig({
                  key: col.dataIndex,
                  direction:
                    sortConfig?.key === col.dataIndex &&
                    sortConfig.direction === "asc"
                      ? "desc"
                      : "asc",
                })
              }
            >
              {col.title}{" "}
              {col.sortable &&
                (sortConfig?.key === col.dataIndex
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : "⇅")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr
            key={row.id}
            className="hover:bg-gray-100 transition-colors duration-150"
          >
            {selectable && (
              <td className="border px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => handleSelectRow(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="border px-4 py-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
