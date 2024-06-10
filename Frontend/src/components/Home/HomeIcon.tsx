const data = [
  {
    id: 1,
    title: "Small task",
    icon: "/icon1.svg",
  },
  {
    id: 2,
    title: "Write",
    icon: "/icon2.svg",
  },
  {
    id: 3,
    title: "Do it",
    icon: "/icon3.svg",
  },
  {
    id: 4,
    title: "Repeat",
    icon: "/icon4.svg",
  },
];

const HomeIcon = () => {
  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-between items-center mb-10 md:mb-0"
        >
          <img src={item.icon} alt={item.title} />
          <h3>{item.title}</h3>
        </div>
      ))}
    </>
  );
};

export default HomeIcon;
