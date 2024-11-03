const HistoryContent = () => {
  return (
    <div className="bg-[#f5f5f5]  p-5 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-5">History</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-neutral-300 dark:border-neutral-700">
            <th className="p-2">Template</th>
            <th className="p-2">Title</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Total Words</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-neutral-300 dark:border-neutral-700">
            <td className="p-2">Code Generator</td>
            <td className="p-2">Give me code gpt</td>
            <td className="p-2">2024-11-01</td>
            <td className="p-2">150</td>
          </tr>
          <tr className="border-b border-neutral-300 dark:border-neutral-700">
            <td className="p-2">Code Generator</td>
            <td className="p-2">Give me code gpt</td>
            <td className="p-2">2024-11-01</td>
            <td className="p-2">150</td>
          </tr>
          <tr className="border-b border-neutral-300 dark:border-neutral-700">
            <td className="p-2">Code Generator</td>
            <td className="p-2">Give me code gpt</td>
            <td className="p-2">2024-11-01</td>
            <td className="p-2">150</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HistoryContent;
