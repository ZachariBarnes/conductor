import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ExportConductor } from "./modules/conductor/ExportConductor";
import { AddSectionModal } from "./modules/AddSectionModal";
import { Conductor } from "./modules/conductor/Conductor";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route path="/conductor/export">
              <ExportConductor />
            </Route>
            <Route path="/conductor">
              <Conductor props={AddSectionModal} />
            </Route>
            <Redirect from="/" to="/conductor" />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
