import json

def json_creater(longrunning):


    longrunning 
    json = {"response": {
                "results":[
                    {
                        "alternatives": [
                            {
                                "transcript":,
                                "confidence":,
                                "words": [
                                    {
                                        "startTime":,
                                        "endTime":,
                                        "word":
                                    }
                                ]
                            }
                        ]
                    }
                ]
    }}
    longrunning

    results = []
    for result in longrunning.results:
        alter = {
            "transcript": "",
            "confidence": "",
            "words": []
        }
        alter.["transcript"] = result.alternatives[0].transcript
        alter.["confidence"] = result.alternatives[0].confidence
    
        # into array of word dictionaries
        for wrd in result.alternatives[0].words:
            temp_dict = {
                "startTime": "",
                "endTime": "",
                "word": ""
            }
            temp_dict["startTime"] = wrd.start_time # TODO: figure out to convert datetime to string in form "0.0s"
            temp_dict["endTime"] = wrd.end_time
            temp_dict["word"] = wrd.word
            alter["words"].append(temp_dict)

        alter2 = []
        alter2.append(alter)
        result2 = {"alternative": alter2}
        results.append(result2)
    fin_json = {"response": "results": results}
    return fin_json


