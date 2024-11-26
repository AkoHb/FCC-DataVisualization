export default function isValidURL(link) { 
    
    try {
        new URL(link);
        return true;

    } catch(e) {
        
        return false
    }
};