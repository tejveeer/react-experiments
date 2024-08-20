export default function Experiment() {
  return (
    <>
      <div className="flex flex-col gap-2 p-5 text-gray-600">
        <span className="font-mono text-orange-500">Non-customized div</span>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim ut,
          maxime aspernatur iste reprehenderit neque blanditiis velit alias
          cumque, recusandae corrupti in provident ea voluptatum deleniti.
          Dignissimos explicabo officia debitis.
        </div>
        <span className="font-mono text-orange-500">Customized Div</span>
        <div className="text-purple-900">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet placeat
          a fugiat laborum saepe perferendis veritatis illum? Ducimus libero est
          inventore architecto, nesciunt provident perferendis molestias
          deserunt suscipit consectetur pariatur.
        </div>
      </div>
    </>
  );
}
