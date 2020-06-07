    import React,{useEffect,useState} from 'react'
    import './styles.css'
    import logo from '../../assets/logo.svg'
    import {Link,useHistory} from 'react-router-dom'
    import{FiArrowLeft} from 'react-icons/fi'
    import {Map,TileLayer,Marker} from 'react-leaflet'
    import api from '../../services/api'
    import axios from 'axios'
    

    const CreatePoint = () => {
        const [initialPosition,setInitialPosition] = useState([0,0])
        const [items,setItems] = useState ([])
        const [ufs,setUfs] = useState([])
        const [selectUf,setSelectedUf] = useState('0')
        const[cities,setCities] = useState([])
        const[selectCity,setSelectedCity] = useState('0')
        const[selectedPosition,setSelectedPosition] = useState([0,0])
        const[selectedItems,setSelectedItems] = useState([])
        const history = useHistory()
        const[formData,setFormData] = useState({
            name:'',
            email:'',
            whatssapp:''
        })



        function handleInputChange(event){
            const{name,value} = event.target
            setFormData({...formData,[name]:value})
        }
        function handleSelectItem(id){

            const alreadySelected = selectedItems.findIndex(item=> item===id)
            if(alreadySelected >= 0){
                const filteredItems = selectedItems.filter(item=> item!==id)
                setSelectedItems(filteredItems)

            }else{
                setSelectedItems([...selectedItems,id])
            }
          
        }

        useEffect(()=>{
         navigator.geolocation.getCurrentPosition(position=>{
             const {latitude,longitude} = position.coords
             setInitialPosition([latitude,longitude])
         })
        },[])

        function handleSelectUf(event){
         const uf = event.target.value
         setSelectedUf(uf)
        }


        function handleSelectCity(event){
            const city =  event.target.value
            setSelectedCity(city)
           }


        function handleMapClick(event)
        {
            setSelectedPosition([
                event.latlng.lat,
                event.latlng.lng    
            ])
            
        }

         async function handleSubmit(event){
            event.preventDefault();
            const uf = selectUf
            const city = selectCity
            const [latitude,longitude] = selectedPosition
            const {name,email,whatssap} = formData
            const items = selectedItems
            const data = {
                name,
                email,
                whatsapp:whatssap,
                latitude,
                longitude,
                city,
                uf,
                items
            }
            console.log(data)
            await api.post('points',data)
            alert("Ponto de coleta criado")
            history.push('/')
        }

             
        useEffect(()=>{
            api.get('items').then(response=>{
                setItems(response.data)
       
        }, [])})

        useEffect(()=>{
            axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response=>{
                const ufInitials = response.data.map(uf=> uf.sigla)
                setUfs(ufInitials)
            })
        },[])

        useEffect(()=>{
            //CARREGAR AS CIDADES SEMPRE QUE A UF MUDAR//
            if(selectUf==='0'){
                return
            }
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectUf}/municipios`).then(response=>{
                const cityNames = response.data.map(city=> city.nome)
                setCities(cityNames)
            })

         
        },[selectUf])


        return (
        <div id='page-create-point'>
            <header>
                <img src={logo} alt='Ecoleta'></img>
                <Link to="/">
                    <FiArrowLeft/>
                    Voltar para Home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br/>ponto de coleta</h1>
                <fieldset>
                    <legend><h2>Dados</h2></legend>
                    <div className="field">
                    <label htmlFor="name">Nome da entidade</label>
                    <input type="text"name="name"id="name" onChange={handleInputChange}></input>
                    </div>

                    <div className="field-group">

                    <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input type="email"name="email"id="email"onChange={handleInputChange}></input>
                    </div>

                    <div className="field">
                    <label htmlFor="name">Whatssap</label>
                    <input type="text"name="whatssap"id="whatssap"onChange={handleInputChange} ></input>
                    </div>
                    </div>
         


                </fieldset>


                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                    
                    <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <Marker position={selectedPosition}/>
                </Map>
                    <div className='field-group'>
                        <div className="field">
                        <label htmlFor="uf">Estado (uf)</label>
                        <select name="uf"id="uf" value={selectUf} onChange={handleSelectUf}>
                             <option value="0">Selecione uma Uf</option>
                             {ufs.map(uf=>(
                                 <option key={uf} value={uf}>{uf}</option>
                             ))}
                        </select>
                        </div>
                        <div className="field">
                        <label htmlFor="city">Cidade</label>
                        <select name="city"id="city" value={selectCity} onChange={handleSelectCity}>
                             <option value="0">Selecione uma cidade</option>
                             {cities.map(city=>(
                                 <option key={city} value={city}>  {city} </option>
                             ))}
                        </select>
                        </div>
                    </div>

                </fieldset>


                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item=>(
                            <li key={item.id}  onClick={()=> handleSelectItem(item.id)} 
                            className={selectedItems.includes(item.id) ?'selected':''}>
                                <img src={item.image_url} alt={item.title} ></img>
                                <span>{item.title}</span>
                            </li>
                        ))}                   
                    </ul>
                </fieldset>

              <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>

        )
    }
    export default CreatePoint