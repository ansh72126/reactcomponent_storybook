
import "./App.css";

import { DataTable } from "./component/DataTable";
import { InputField } from "./component/InputField";

function App() {
  return (
    <div className="App">
      <h1>🚀 My React Components</h1>

      <section>
        <h2>🔍 Input Field</h2>
        <InputField label="Username" placeholder="Enter your username" />
      </section>

      <section>
        <h2>📋 Data Table</h2>
        <DataTable
          data={[
            { id: 1, name: "Alice", email: "alice@example.com" },
            { id: 2, name: "Bob", email: "bob@example.com" },
          ]}
          columns={[
            { key: "id", title: "ID", dataIndex: "id", sortable: true },
            { key: "name", title: "Name", dataIndex: "name", sortable: true },
            { key: "email", title: "Email", dataIndex: "email" },
          ]}
          selectable
          onRowSelect={(rows) => console.log("Selected:", rows)}
        />
      </section>
    </div>
  );
}

export default App;
