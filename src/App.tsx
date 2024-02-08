import AddHero from "./AddHero";
import DeleteHero from "./DeleteHero";
import GetAHero from "./GetAHero";
import GetCount from "./GetCount";
import GetHeroOrdered from "./GetHeroOrdered";
import GetHeroWhere from "./GetHeroWhere";
import Login from "./Login";
import SignUp from "./SignUp";
import UpdateHero from "./UpdateHero";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/addhero" element={<AddHero />} />
          <Route path="/deletehero" element={<DeleteHero />} />
          <Route path="/updatehero" element={<UpdateHero />} />

          <Route path="/gethero" element={<GetAHero />} />
          <Route path="/getcount" element={<GetCount />} />
          <Route path="/getheroordered" element={<GetHeroOrdered />} />
          <Route path="/getherowhere" element={<GetHeroWhere />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </Router>
    </>
  );
};

export default App;
