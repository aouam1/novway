import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessage,
  sendInterventionData,
} from "../features/InterventionSlice";
import LogoutButton from "./Logout";



export default function Form() {
  const status = useSelector((state) => state.intervention.status);
  const message = useSelector(selectMessage);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    company: "",
    fait_generateur: "",
    ass_tech: "",
    logiciel: "",
    tech_du_service: "",
    representant_entr: "",
    heur_debut: "",
    heur_fin: "",
  });
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (formData.heur_debut && formData.heur_fin) {
      const start = new Date(`1970-01-01T${formData.heur_debut}:00`);
      const end = new Date(`1970-01-01T${formData.heur_fin}:00`);
      const diff = Math.abs(end - start) / 60000; // Calculate difference in minutes

      setDuration(`${Math.floor(diff / 60)}h ${diff % 60}min`);
    } else {
      setDuration("");
    }
  }, [formData.heur_debut, formData.heur_fin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, duree: duration, date };
    dispatch(sendInterventionData(data));
  };

  return (
    <>
      <LogoutButton />
    
        <div  > 

          <div className="flex flex-col justify-cente  mx-auto" style={  {minWidth :"880px"}}>
            <form
              className="font-serif bg-gray-100 p-20 rounded-lg shadow-lg max-w-2xl mx-auto "
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <h2 className="text-4xl font-bold text-center py-6">
                Fiche d'intervention
              </h2>
              <div >
                <label className="block font-bold mb-5"> Entreprise</label>
                <select
                  onChange={handleChange}
                  name="company"
                  className="w-full py-2 mb-5 border border-gray-300 rounded bg-gray-200"
                >
                   <option value="">choisi l'Entreprise</option>
                  <option value="novway"> Novway </option>
                  <option value="ent02"> Ent2 </option>
                  <option value="ent03">Ent3</option>
                </select>
              </div>
              <div className=" mb-4 ">
                <label className="block font-bold mb-5">Fait generateur</label>
                <select
                  onChange={handleChange}
                  name="fait_generateur"
                  className="w-full py-2 mb-5 border border-gray-300 rounded bg-gray-200"
                >
                   <option value="">choisi l'option</option>
                  <option value="app_usser"> Appel de l'utilisateur</option>
                  <option value="rendez-vous"> Rendez vous</option>
                  <option value="form"> Formation</option>
                  <option value="autre"> Autre (Preciser)</option>
                </select>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-10">
                  NATURE DE L'INTERVENTION
                </h3>
                <div>
                  <label className="block font-bold mb-5">
                    ASSISTANCE TECHNICIEN
                  </label>
                  <select
                    name="ass_tech"
                    onChange={handleChange}
                    multiple
                    size="5"
                    className="w-full py-2 mb-5 border border-gray-300 rounded bg-gray-200"
                  >
        
                    <option value="installation_m"> Installation Matériel</option>
                    <option value="dépannage_m"> Dépannage Matériel</option>
                    <option value="mise_à_jour">
                      Mise à jour matériel (ext.Mémoire...)
                    </option>
                    <option value="system">MAJ système exploitation </option>
                    <option value="autre">Autre(péciser) </option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-5">LOGICIEL</label>
                  <select
                    onChange={handleChange}
                    name="logiciel"
                    multiple
                    size="6"
                    className="w-full py-2 mb-5 border border-gray-300 rounded bg-gray-200"
                  >
        
                    <option value="installation_l"> Installation logiciel</option>
                    <option value="MAJ">MAJ version </option>
                    <option value="logiciel">logiciel</option>
                    <option value="format">Formation initial</option>
                    <option value="dépannage_l">Dépannage logiciel </option>
                    <option value="autre"> Autre(péciser)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-5">
                    TECHNICIEN DU SERVICE INFORMATIQUE - OBSERVETION :
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded box-border mb-5 py-2 resize-none"
                    placeholder=""
                    name="tech_du_service"
                    rows="4"
                    value={formData.tech_du_service}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <label className="block font-bold mb-5">
                  {" "}
                  REPRESENTANT DE L'ENTREPRISE - OBSERVETION :
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded box-border mb-5 py-2 resize-none"
                  placeholder=""
                  name="representant_entr"
                  rows="4"
                  value={formData.representant_entr}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block font-bold mb-5">Heure debut :</label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded box-border mb-5 py-2"
                  name="heur_debut"
                  value={formData.heur_debut}
                  onChange={handleChange}
                  required
                ></input>
                <label className="block font-bold mb-5">Heure fin :</label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded box-border mb-5 py-2"
                  name="heur_fin"
                  value={formData.heur_fin}
                  onChange={handleChange}
                  required
                ></input>
                <label className="block font-bold mb-5">
                  DUREE DE L'INTERVENTION :
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="duration"
                  value={duration}
                  readOnly
                  className="w-full border border-gray-300 rounded box-border mb-5 py-2"
                ></input>
                <label className="block font-bold mb-5">DATE </label>
                <input
                  type="text"
                  id="date"
                  value={date}
                  readOnly
                  className="w-full border border-gray-300 rounded box-border mb-5 py-2"
                ></input>
              </div>
              <button
                   disabled={status === "loading"}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  ${
                  status === "loading" ? "opacity-50 cursor-wait" : ""
                  }`}
                    type="submit"
                 >
                   {status === "loading" ? "Submiting..." : "Submit"}
                      </button>
              {message && (
                <div className="mt-4 text-center">
                  <p
                    className={`${
                      status === "succeeded" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {message}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
   
    </>
  );
}
