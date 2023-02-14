import React  from 'react';
import PetsIcon from "@mui/icons-material/Pets";
import MaleIcon from "@mui/icons-material/Male";
import callAjax from "../../lib/Ajax";
import SearchIcon from '@mui/icons-material/Search';
import FemaleIcon from "@mui/icons-material/Female";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Therapy() {

    const [animalTherapyLoaded, setAnimalTherapyLoaded] = React.useState(false);
    const [animalsTherapy, setAnimalsTherapy] = React.useState([]);

    React.useEffect(() => {
        getAnimalsTherapy();
    },[]);

    function getAnimalsTherapy(){
        var headers = { 'Authorization': sessionStorage.access_token ? sessionStorage.access_token : null }

        let options = {
            headers: headers,
            type: "get",
            url: `http://localhost:8765/therapy/v2/animalsTherapy`,
            dataType: null,
            cache: false,
            data: null,
            processData: false,
            contentType: false,
            success: function (response) {
                var tmp = [];
                response.map(animalTherapy => {
                    return tmp.push(animalTherapy);
                });
                setAnimalsTherapy(tmp);
                setAnimalTherapyLoaded(true);
            }
        };
        callAjax(options);
    }


    return (
        <>
            <div className='filters-containers'>
                <div>
                    <input className='input-search'></input>
                    <button className='footer-button'><SearchIcon /></button>                           
                </div>   
                <div>
                    <label>Età minima: </label>
                    <input type="number" id="age-min" name="quantity" min="0" max="20"/>
                    <label>Età massima: </label>
                    <input type="number" id="age-max" name="quantity" min="0" max="20" />
                    <button className='footer-button'><ArrowForwardIosIcon /></button>                           
                </div>
                <div>
                    <label>Dimensione minima: </label>
                    <input type="number" id="dim-min" name="quantity" min="1" max="3"/>
                    <label>Età massima: </label>
                    <input type="number" id="dim-max" name="quantity" min="1" max="3" />
                    <button className='footer-button'><ArrowForwardIosIcon /></button>   
                </div>
                <div>
                    <label>Provenienza: </label>
                    <select name="cities">
                        <option value="1">Torino</option>
                        <option value="2">Milano</option>
                        <option value="3">Napoli</option>
                        <option value="4">Roma</option>
                    </select>
                    <button className='footer-button'><ArrowForwardIosIcon /></button>   
                </div>
                <div>
                    <label>Ordina per</label>
                    <select id="orderBy" name="orderBy">
                        <option value="1">Età crescente</option>
                        <option value="2">Età decrescente</option>
                        <option value="3">Dimensione crescente</option>
                        <option value="4">Dimensione decrescente</option>
                    </select>
                </div>   
            </div>
            <hr className='solid'/>
            <h2>Tutti gli animali da terapia <PetsIcon /></h2>
            {animalTherapyLoaded && <div className='profile-animals-container'>
                {animalsTherapy.map(item =>{
                    return (
                        <div key={item.id} className="animal-box">
                            <img src={item.img} alt={item.name}/>
                            <p>{item.name} {item.gender === 'M' ? <MaleIcon /> : <FemaleIcon />}</p>
                        </div>
                    );
                })}
            </div>}
        </> 
    );
}

export default Therapy;