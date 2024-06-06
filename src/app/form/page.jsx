
// export default function form() {
//   const [name, setName] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   return(
//     <main>
//       <form action="/action_page.php">
//         <label for="fname">Header:</label>
//         <input type="text" id="fname" name="fname" value="John" />

//         <label for="lname">Description:</label>
//         <input type="text" id="lname" name="lname" value="Doe" />

//         <input
//           type="text"
//           accept="image/*"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           type="file"
//           value={selectedFile}
//           onChange={(e) => setSelectedFile(e.target.files[0])}
//         />
//       </form>

//         <input type="submit" value="Submit" />
//       </form>
//     </main>
//   )
// }