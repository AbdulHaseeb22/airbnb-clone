from django.http import JsonResponse
from rest_framework.decorators import api_view
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity



def spliting(fileName):
    File =  open(fileName, "r")
    Whole = list(File.read())
    line=""
    Skills = []
    for i in Whole:
        if i is " " or i is ":" or i is "," or i is "\n":
            line=str(line).lower()
            Skills.append(line)
            line=""
        else:
            line+=i
    
    return Skills


@api_view(['POST'])
def cv_exraction(request):

    Data = json.loads(request.body)
    job_description = Data['Desc']
    resume_text = Data['ResumeText']

    text = [resume_text,job_description]

    cvSkills =[]
    words=[]    
    word=""

    cv = CountVectorizer()

    count_matrix = cv.fit_transform(text)

    for i in resume_text:
        if i is " " or i is ":" or i is "," or i is "\n":
            if word is "":
                continue
            else:
                word=str(word).lower()
                words.append(word)
                word=""
        else:
            word+=i
    
    skills = spliting("D:\\khushnoodFYP\\KS_FYP\\FYP\\FYP\\SkillSets.dat")

    for i in words:
        if i in skills:
            cvSkills.append(i)


    SimilarityScore = cosine_similarity(count_matrix)
    matchPercentage = cosine_similarity(count_matrix)[0][1]*100
    matchPercentage = round(matchPercentage)


    response = {
        'ResumeMatching': str(matchPercentage)+"%",
        'cvSkills':str(cvSkills)
    }

    return JsonResponse(response)