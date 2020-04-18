import React, {useState, useEffect}from 'react';
import{ Feather } from  '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View,FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles'; 

export default function Incidents(){
    const [Incidents,setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    function navigationToDetail(incident){
        navigation.navigate('Detail',{incident});
    }

    async function loadIncidents(){
        if(loading){
            return;
        }
        if(total > 0 && Incidents.length == total){
            return;
        }
        setLoading(true);
      const response = await api.get('incidents',{params:{page}});
      setIncidents([...Incidents, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);
    }
    useEffect(() => {
       loadIncidents();
    },[]);


    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo salve o dia.</Text>
        
            <FlatList 
             data={Incidents}
             style={styles.IncidentsList}
             keyExtractor = {Incident => String(Incident.id)}
             showsVerticalScrollIndicator={false}
             onEndReached={loadIncidents}
             onEndReachedThreshold={0.2}
             renderItem={({ item: Incident })=>(
            <View style={styles.Incident} >
                <Text style={styles.IncidentProperty}>ONG:</Text>
             <Text style={styles.IncidentValue}>{Incident.name}</Text>

                <Text style={styles.IncidentProperty}>CASO:</Text>
                <Text style={styles.IncidentValue}>{Incident.title}</Text>

                <Text style={styles.IncidentProperty}>VALOR:</Text>
                <Text style={styles.IncidentValue}>
                    {Intl.NumberFormat('pt-BR',{
                    style:'currency',
                    currency: 'BRL'
                    }).format(Incident.Value)}
                    </Text>
            
                <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => navigationToDetail(Incident)}
                >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#E02041"/>
                </TouchableOpacity>
            
            </View>
             )}
            />
        </View>

    );
}
