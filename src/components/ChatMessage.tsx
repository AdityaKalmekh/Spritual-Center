const ChatMessage = ({ message, user }: { message: any; user: any }) => {
  const date = new Date(message.createdAt);
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const time = `${hours}:${minutes}`;
  console.log(date.toLocaleString());
  
  return (
    <>
      {user === message.UserId ? (
        <div className="mr-3 d-flex justify-content-end mt-3">
          <div className="d-flex justify-content-center card shadow" style={{minWidth : "250px",maxWidth:"700px"}}>
            <span className="ml-2 pt-1">{message.Content}</span>
            <span style={{ paddingLeft: "70%" }} >
              {time}
            </span>
          </div>
        </div>
      ) : (
        <div className="mr-3 d-flex justify-content-start mt-3">
          <div className="d-flex justify-content-center w-25 card shadow">
            <span className="ml-2 pt-1">{message.Content}</span>
            <span style={{ paddingLeft: "70%" }} >
              {time}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
