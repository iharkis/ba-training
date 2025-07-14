// Simple test to isolate the issue
export default function TestComponent() {
  const steps = [
    {
      id: 'test',
      title: 'Test',
      content: (
        <div>Test content</div>
      )
    }
  ];

  return (
    <div>Test</div>
  );
}