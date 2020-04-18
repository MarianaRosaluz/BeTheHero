import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute} from '@react-navigation/native';
import { View,Text, Image,TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';


import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.name}, gostaria de ajudar no caso "${incident.title}" com ${Intl.NumberFormat('pt-BR',{
        style:'currency',
        currency: 'BRL'
        }).format(incident.Value)}`;
    

    function navigationBack(){
        navigation.goBack()
    }
    function SendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: ['marianarosaluz@yahoo.com.br'],
            body:message,
        })

    }
    function SendWhatsapp(){
Linking.openURL(`whatsapp://send?phone=5531993724629&text=${message}`);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source ={logoImg}/>
                <TouchableOpacity onPress={navigationBack}>
                    <Feather name= "arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>
            <View style={styles.Incident}>
            <Text style={styles.IncidentProperty,{ margin: 0 }}>ONG:</Text>
    <Text style={styles.IncidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.IncidentProperty}>CASO:</Text>
                <Text style={styles.IncidentValue}>{incident.title}</Text>

                <Text style={styles.IncidentProperty}>VALOR:</Text>
                <Text style={styles.IncidentValue}>
                    {Intl.NumberFormat('pt-BR',{
                    style:'currency',
                    currency: 'BRL'
                    }).format(incident.Value)}
                    </Text>
            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
         
                <Text style={styles.heroDescription}>Entre em contato:</Text>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={SendWhatsapp}>
                    <Text style={styles.actionText}>WhatsApp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={SendMail}>
                    <Text style={styles.actionText}>E-mail</Text>
                </TouchableOpacity>
                
            </View>
            </View>
            </View>
    );
}